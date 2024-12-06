import { FC, useState } from 'react';

import { Button, Select } from '~/components';
import Modal from '~/components/modal/modal';
import { useProjectUsers } from '~/modules/projects';
import * as Forms from '~/modules/projects/forms';
import { useTeam } from '~/modules/team';
import { TOption } from '~/utils';

interface InviteUserProps {
  projectId: string;
}

const InviteUser: FC<InviteUserProps> = ({ projectId }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { users } = useTeam();
  const { projectUsers } = useProjectUsers(projectId);

  const getOptions = (): TOption[] => {
    let options: TOption[] = [];

    options = users.map(user => ({ label: user.fullName, value: user.id }));
    const temp = new Set(projectUsers.map(item => item.id));

    options = options.filter(item => !temp.has(item.value));

    return options;
  };

  return (
    <div>
      <Button intent="default" className="w-full" size="sm" onClick={() => setOpen(true)}>
        Biriktirish
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} header={<p className=" text-xl font-medium">Foydalanuvchi qo'shish</p>}>
        <Forms.InviteUser
          onSuccess={() => {
            setOpen(false);
          }}
          projectId={projectId}
          setLoading={setLoading}
          children={({ formState: { errors }, control }) => (
            <div className="flex w-full flex-col gap-3">
              <Select
                label={
                  <div>
                    Foydalanuvchini tanlang <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                  </div>
                }
                placeholder="Foydalanuvchini tanlang"
                control={control}
                name="userId"
                options={getOptions()}
                error={errors.userId?.message}
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

export default InviteUser;
