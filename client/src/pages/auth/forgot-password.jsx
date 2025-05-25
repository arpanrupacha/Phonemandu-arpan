import { useState } from "react";
import { useDispatch } from "react-redux";
import { requestPasswordReset } from "@/store/auth-slice";
import { useToast } from "@/components/ui/use-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset(email)).then((data) => {
      toast({ title: data?.payload?.message });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="input input-bordered w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="btn btn-primary w-full" type="submit">
        Send Reset Link
      </button>
    </form>
  );
}

export default ForgotPassword;