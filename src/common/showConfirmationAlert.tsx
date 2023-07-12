import Swal from 'sweetalert2';

const ShowConfirmationAlert = async (breakType: string): Promise<boolean> => {
  const result = await Swal.fire({
    title: `Confirm ${breakType}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  });
  return result.isConfirmed;
};

export default ShowConfirmationAlert