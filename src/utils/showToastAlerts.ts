import { toast } from "react-toastify";

export function ToastSuccess(msg: string) {
    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export function ToastError(msg: string) {
    toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
}
export function ToastWarning(msg: string) {
    toast.warning(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
}
