import { createAction } from '@reduxjs/toolkit';
import { ToastType } from '@stacks/ui';
import { Network, NetworkOptions, Environment } from '@store/ui/reducer';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const doAddToast = createAction('ui/toast/add', withPayloadType<ToastType>());
export const doRemoveToast = createAction('ui/toast/remove', withPayloadType<string>());
export const appTime = createAction('ui/time');
export const setEnv = createAction('ui/config/env', withPayloadType<Environment>());

export const setNetworks = createAction('ui/config/network', withPayloadType<Network>());
export const selectNetwork = createAction(
  'ui/config/network/select',
  withPayloadType<NetworkOptions>()
);
