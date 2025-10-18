'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

const schema = z.object({
  itemId: z.number({ required_error: 'Item is required' }),
  market: z.string().min(1, 'Market is required'),
  comparator: z.enum(['<=', '>=', 'delta%']),
  threshold: z.coerce.number().finite('Threshold must be a number'),
  note: z.string().max(140).optional()
});

type FormValues = z.infer<typeof schema>;

export default function AlertDialog({ itemId }: { itemId: number }) {
  const client = useQueryClient();
  const [open, setOpen] = useState(false);
  const defaults: FormValues = {
    itemId,
    market: 'buff',
    comparator: '<=',
    threshold: 0,
    note: ''
  };

  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults
  });


  useEffect(() => {
    reset({ ...defaults, itemId });
  }, [itemId, reset]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      api('/v1/alerts', {
        method: 'POST',
        body: JSON.stringify({
          item_id: values.itemId,
          market: values.market,
          condition: buildCondition(values),
          note: values.note
        })
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: queryKeys.alerts });
      setOpen(false);
      reset({ ...defaults, itemId });
    }
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
      >
        Create Alert
      </button>
      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Create price alert</h2>
            <div className="mt-4 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm">
                Market
                <select className="rounded-xl bg-slate-900 px-3 py-2" {...register('market')}>
                  <option value="buff">BUFF</option>
                  <option value="steam">Steam</option>
                  <option value="skinport">Skinport</option>
                </select>
                {formState.errors.market && <span className="text-xs text-red-400">{formState.errors.market.message}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Comparator
                <select className="rounded-xl bg-slate-900 px-3 py-2" {...register('comparator')}>
                  <option value="<=">&le;</option>
                  <option value=">=">&ge;</option>
                  <option value="delta%">Δ%</option>
                </select>
                {formState.errors.comparator && <span className="text-xs text-red-400">{formState.errors.comparator.message}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Threshold
                <input
                  type="number"
                  step="any"
                  className="rounded-xl bg-slate-900 px-3 py-2"
                  {...register('threshold')}
                />
                {formState.errors.threshold && <span className="text-xs text-red-400">{formState.errors.threshold.message}</span>}
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Note
                <textarea className="rounded-xl bg-slate-900 px-3 py-2" rows={3} {...register('note')} />
                {formState.errors.note && <span className="text-xs text-red-400">{formState.errors.note.message}</span>}
              </label>
            </div>
            {mutation.isError && (
              <p className="mt-3 text-sm text-red-400">Failed to create alert. {`${(mutation.error as Error).message}`}</p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                className="rounded-xl px-4 py-2 text-sm text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Saving…' : 'Save alert'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function buildCondition(values: FormValues) {
  if (values.comparator === 'delta%') {
    return `change_pct <= ${values.threshold}`;
  }
  return `price_net_usd ${values.comparator} ${values.threshold}`;
}
