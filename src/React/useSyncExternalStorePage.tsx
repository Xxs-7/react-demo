import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange);
  return () => window.removeEventListener("scroll", onStoreChange);
}
function useScrollY(getY = (id: number) => id) {
  return useSyncExternalStore(
    subscribe,
    () => getY(window.scrollY),
    () => undefined
  );
}

const GetYExample = () => {
  const scrollY = useScrollY();

  return (
    <>
      {Array.from({ length: 100 }).map((_, index) => {
        return <p key={index}>占位符</p>;
      })}
      <div style={{ position: "fixed", bottom: "0px", right: "0px" }}>
        <div>{scrollY}</div>
      </div>
    </>
  );
};

function onlinesubscrbe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function useOnlineStatus() {
  return useSyncExternalStore(
    onlinesubscrbe,
    () => navigator.onLine,
    () => true
  );
}

function OnlineExample() {
  const isOnline = useOnlineStatus();
  // console.log("isOnline", isOnline);
  return <div>isOnline:{isOnline.toString()}</div>;
}

export default function UseSyncExternalStorePage() {
  return (
    <div>
      <OnlineExample />
      <GetYExample />
    </div>
  );
}
