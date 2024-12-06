'use client';

import { FC, useState } from 'react';

import { Button, Input } from '~/components';
import Modal from '~/components/modal/modal';
import { useAuth } from '~/hooks';
import * as Forms from '~/modules/plans/forms';
import { useProjects } from '~/modules/projects';

interface CreatePlanProps {}

const CreatePlan: FC<CreatePlanProps> = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { currentProject } = useAuth();
  const { projects } = useProjects();

  return (
    <div>
      <Button disabled={!projects.length || currentProject?.isEnded} intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
        Qo'shish
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Smeta yaratish</p>}>
        <Forms.CreatePlan
          onSuccess={() => {
            setOpen(false);
            setLoading(false);
          }}
          setLoading={setLoading}
          children={({ register, formState: { errors }, control, watch }) => (
            <div className="flex w-full flex-col gap-3">
              <Input
                label={
                  <div>
                    Smeta nomi <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                  </div>
                }
                {...register('name')}
                placeholder="Smeta nomini kiriting"
                error={errors.name?.message}
              />

              <div className="flex w-full items-center justify-end gap-2">
                <Button size="sm" className="w-max" type="button" intent="default" disabled={loading} onClick={() => setOpen(false)}>
                  Bekor qilish
                </Button>
                <Button size="sm" type="submit" className="w-max" loading={loading}>
                  Yaratish
                </Button>
              </div>
            </div>
          )}
        />
      </Modal>
    </div>
  );
};

export default CreatePlan;
