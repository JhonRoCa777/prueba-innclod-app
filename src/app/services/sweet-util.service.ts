import Swal from "sweetalert2";

export const SweetUtilService = {

  success(msg: string) {
    Swal.fire({
      title: 'Exito',
      text: msg,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  },

  warning(msg: string) {
    Swal.fire({
      title: 'Alerta',
      text: msg,
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}
