import { toast, ToastContainer } from "react-toastify"

export function signEmpty() {
    toast.error("Email dan Password tidak boleh kosong!", {
        position: toast.POSITION.TOP_RIGHT,
    })
}

export function createEmpty() {
    toast.error("Failed to add data!", {
        position: toast.POSITION.TOP_RIGHT,
    })
}
