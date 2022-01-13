import { Listbox } from '@headlessui/react';

import { useMapStore } from '@/hooks/use-map-store';

export interface IListValue {
  value: 1 | 6 | 12;
  name: string;
}

const timeframes: IListValue[] = [
  { value: 1, name: 'Last 1 hour' },
  { value: 6, name: 'Last 6 hours' },
  { value: 12, name: 'Last 12 hours' },
];

export function TimeframeListbox(): JSX.Element {
  const currentTimeFrame = useMapStore((state) => state.currentTimeframe);

  const setCurrentTimeFrame = useMapStore((state) => state.setCurrentTimeframe);

  return (
    <div className="relative">
      <Listbox value={currentTimeFrame} onChange={setCurrentTimeFrame}>
        <Listbox.Options className="space-y-2 w-52 absolute rounded py-3 px-2 bottom-[55px] left-0 bg-foreground text-background">
          {timeframes.map((t) => (
            <Listbox.Option
              className={({ active, selected }) =>
                `p-2 cursor-pointer transition rounded text-background bg-foreground ${
                  selected && 'text-background bg-accent-7'
                } ${active && 'text-background bg-accent-6'}`
              }
              key={t.value}
              value={t.value}
            >
              {t.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>

        <Listbox.Button className="w-52 flex justify-center items-center rounded transition hover:bg-accent-6 bg-accent-7 text-background p-2">
          Select Timeframe
        </Listbox.Button>
      </Listbox>
    </div>
  );
}
