import { message } from 'antd';

import Icon from '../icons/icon';

import './toast.css';

const toast = {
  success: (content: string) =>
    message.success({
      content,
      icon: <Icon name="successful" className="text-spring" classNameIcon=" w-4 h-4" />
    }),
  error: (content: string) => message.error({ content, icon: <Icon name="error" classNameIcon=" w-4 h-4" /> }),
  warning: (content: string) => message.warning({ content, icon: <Icon name="tooltip" className="text-summer" classNameIcon=" w-4 h-4" /> }),
  info: (content: string) => message.info({ content, icon: <Icon name="integrations" className="text-[#476DF2]" classNameIcon=" w-4 h-4" /> }),
  great: (content: string) => message.success({ content, icon: <Icon name="like" classNameIcon=" w-4 h-4" /> })
};

export default toast;
