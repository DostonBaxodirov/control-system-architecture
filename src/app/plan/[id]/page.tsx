import { FC } from 'react';

import { Main } from '~/components';

import { Info, SubPlanTable, TopBar } from './_components';

type SingleProps = {
  params: { id: string };
};

const Single: FC<SingleProps> = ({ params }) => (
  <Main>
    <TopBar id={params.id} />
    <Info id={params.id} />
    <SubPlanTable id={params.id} />
  </Main>
);

export default Single;
