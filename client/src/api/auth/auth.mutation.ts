import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { forgotPassword, login, resendOtp, resetPassword, signup, verifyEmail, verifyResetPassword } from "./auth.api";
import { useAuth } from "@/store/auth.store";
import { useOtpStore } from "@/store/otp.store";

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
    const setResendAvailableAt = useOtpStore(
        (state) => state.setResendAvailableAt
    );
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signup,
        onSuccess: (data: any) => {
            toast.success(data.message);
            setResendAvailableAt(data.resendAvailableAt);
            navigate("/verify-otp/email-verification")
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
};

export const useVerifyEmail = () => {
    const clearResendAvailableAt = useOtpStore(
        (state) => state.clearResendAvailableAt
    );
    const navigate = useNavigate();
    return useMutation({
        mutationFn: verifyEmail,
        onSuccess: (data: any) => {
            toast.success(data.message);
            clearResendAvailableAt()
            navigate("/login")
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
}

export const useForgotPassword = () => {
    const navigate = useNavigate();
    const setResendAvailableAt = useOtpStore(
        (state) => state.setResendAvailableAt
    );
    return useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data: any) => {
            toast.success(data.message);
            setResendAvailableAt(data.resendAvailableAt);
            navigate("/verify-otp/reset-password")
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
}

export const useVerifyResetPassword = () => {
    const navigate = useNavigate();
    const clearResendAvailableAt = useOtpStore(
        (state) => state.clearResendAvailableAt
    );
    return useMutation({
        mutationFn: verifyResetPassword,
        onSuccess: (data: any) => {
            toast.success(data.message);
            clearResendAvailableAt()
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
    const setResendAvailableAt = useOtpStore(
        (state) => state.setResendAvailableAt
    );
    return useMutation({
        mutationFn: resendOtp,
        onSuccess: (data: any) => {
            setResendAvailableAt(data.resendAvailableAt)
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message);
        }
    });
}