import useMobX from "hooks/use-mobx";

const useConnect = () => {
  const { alerts: alertStore } = useMobX();

  const onCloseAlert = (id: string) => {
    alertStore.removeAlert(id);
  };

  return {
    alerts: alertStore.alerts,
    onCloseAlert,
  };
};

export default useConnect;
