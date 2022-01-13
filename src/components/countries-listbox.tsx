import useSWR from 'swr';
import { useEffect } from 'react';

import { ICountry } from '@/entities/country.entity';
import { fetcher } from '@/util/fetcher';
import { Serialized } from '@/util/serialized';
import { Listbox } from '@headlessui/react';

export interface IProps {
  value: string | undefined;
  onChange(value: string | undefined): void;
}

export function CountriesListbox(props: IProps): JSX.Element {
  const { value, onChange } = props;

  const { data: countries } = useSWR<Serialized<Omit<ICountry, 'geojson'>>[]>(
    '/api/countries',
    fetcher
  );

  useEffect(() => {
    if (countries && countries.length > 0) onChange(countries[0]._id);
  }, [countries, onChange]);

  return (
    <div className="relative mb-4">
      <Listbox disabled={!countries} value={value} onChange={onChange}>
        <Listbox.Options className="space-y-2 w-52 absolute rounded py-3 px-2 top-[55px] left-0 bg-background text-foreground">
          {countries?.map((c) => (
            <Listbox.Option
              className={({ active, selected }) =>
                `p-2 cursor-pointer transition rounded text-foreground bg-accent-2 ${
                  selected && 'text-foreground bg-accent-3'
                } ${active && 'text-foreground bg-accent-4'}`
              }
              key={c._id}
              value={c._id}
            >
              {c.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>

        <Listbox.Button className="w-52 flex justify-center items-center rounded transition hover:bg-accent-6 bg-accent-7 text-background p-2">
          Select Country
        </Listbox.Button>
      </Listbox>
    </div>
  );
}
