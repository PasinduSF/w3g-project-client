"use client";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import useFcmToken from ".";
import firebaseApp from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FcmTokenComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log(
            "Foreground push notification received:",
            payload.data.title
          );

          toast.success(payload.data.body, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
