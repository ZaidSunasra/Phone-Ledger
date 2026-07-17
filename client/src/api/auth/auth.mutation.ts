import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { forgotPassword, login, resendOtp, resetPassword, signup, verifyEmail, verifyResetPassword } from "./auth.api";
import { useAuth } from "@/store/auth.store";

export const useLogin = () => {
    const setUser = useAuth((state) => state.setUser);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: login,
        onSuccess: (data: any) => {
            setUser(data.userData);
            toast.success(data.message);
            navigate("/dashboard");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
};

export const useSignup = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signup,
        onSuccess: (data: any) => {
            toast.success(data.message);
            navigate("/verify-otp/email-verification")
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
};

export const useVerifyEmail = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: verifyEmail,
        onSuccess: (data: any) => {
            toast.success(data.message);
            navigate("/login")
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
}

export const useForgotPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data: any) => {
            toast.success(data.message);
            navigate("/verify-otp/reset-password")
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
}

export const useVerifyResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: verifyResetPassword,
        onSuccess: (data: any) => {
            toast.success(data.message);
            navigate("/reset-password")
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
}

export const useResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: (data: any) => {
            toast.success(data.message);
            navigate("/login")
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
}

export const useResendOtp = () => {
    return useMutation({
        mutationFn: resendOtp,
        onSuccess: (data: any) => {
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
}