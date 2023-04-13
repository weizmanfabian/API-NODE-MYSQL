module.exports = {
	create: {
		position: 'top-end',
		icon: 'success',
		title: 'Registro Exitoso',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	},
	errCreate: {
		position: 'top-end',
		icon: 'error',
		title: 'Error al guardar los datos',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	},
	errDelete: {
		position: 'top-end',
		icon: 'error',
		title: 'Error al eliminar el registro',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	},
	errUpdate: {
		position: 'top-end',
		icon: 'error',
		title: 'Error al actualizar los datos',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	},
	delete: {
		position: 'top-end',
		icon: 'success',
		title: 'Registro Eliminado',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	},
	update: {
		position: 'top-end',
		icon: 'success',
		title: 'Actualización exitosa',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	},
	get: {
		position: 'top-end',
		icon: 'success',
		title: 'Resultados',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	}

};
