import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "@/store/auth-slice";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [formData, setFormData] = useState({ password: "" });
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { token } = useParams();
  const navigate = useNavigate();

  // Password validation: At least 8 chars, one uppercase, one number, one special char
  function isValidPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
  }

  function onSubmit(event) {
    event.preventDefault();

    if (!isValidPassword(formData.password)) {
      toast({
        title:
          "Password must be at least 8 characters, include one uppercase letter, one number, and one special character.",
        variant: "destructive",
      });
      return;
    }

    dispatch(resetPassword({ token, password: formData.password })).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ password: e.target.value })}
        placeholder="Enter new password"
        className="input input-bordered w-full mb-4"
        required
      />
      <button className="btn btn-primary w-full" type="submit">
        Reset Password
      </button>
    </form>
  );
}

export default ResetPassword;