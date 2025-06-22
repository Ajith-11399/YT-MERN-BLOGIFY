import { toast, Slide } from 'react-toastify';

const showToast = (type, message)=> {
    
    const config = {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
    };

    if(type === 'success'){
        toast.success(message, config);
    } else if (type === 'error') {
        toast.error(message, config);
    } else if (type === 'info') {
        toast.info(message, config);
    } else {
        toast(message, config)
    }

}

export default showToast;