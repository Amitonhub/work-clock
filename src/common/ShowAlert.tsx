import Swal from "sweetalert2";

interface AlertResult {
  isConfirmed: boolean;
}

const ShowAlert = {
  confirm: (options: any): Promise<AlertResult> => {
    return Swal.fire({
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      ...options,
    }) as Promise<AlertResult>;
  },

  fire: (title: string, text: string, icon: "success" | "error"): void => {
    Swal.fire({
      title,
      text,
      icon,
    });
  },
};

export default ShowAlert;
