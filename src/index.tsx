
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import environmentManager from "./EnvironmentManager"

const useEnvSelector = environmentManager.useSelector

export {
  useSyncExternalStore,
  environmentManager,
  useEnvSelector
}
export default environmentManager