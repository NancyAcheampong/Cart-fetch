import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput/TextInput";

// src/schemas/authSchemas.ts


const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const otpSchema = z.object({
    email: z.email(),
    otp: z.string().min(4, "Enter the OTP"),
});

type OtpFormValues = z.infer<typeof otpSchema>;
type customerFormValues = {
    email: string,
    password: string
}


type Step = "FORM" | "OTP";



const GeneratePinPage = () => {
    const [step, setStep] = useState<Step>("FORM");
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [emailForOtp, setEmailForOtp] = useState<string | null>(null);
    // const [countdown, setCountdown] = useState<number>(0);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset: resetSignup,
        formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
getValues,
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const {
        register: registerOtp,
        handleSubmit: handleSubmitOtp,
        
        formState: { errors: otpErrors, isSubmitting: isOtpSubmitting },
        setValue
    } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { email: emailForOtp || "", otp: "" },
    });
    console.log("Email", getValues().email, emailForOtp)

    useEffect(() => {
        if (emailForOtp) {
            setValue("email", emailForOtp)
        }
    }, [emailForOtp, setValue])
    // useEffect(() => {
    //     let timer: ReturnType<typeof setTimeout>;

    //     if (countdown > 0) {
    //         timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    //     }
    //     return () => clearTimeout(timer);
    // }, [countdown]);


    const onSignup = async (data: SignupFormValues) => {
        setServerMessage(null);

        try {
            const res = await fetch("http://localhost:3000/api/customers/sendotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data), // backend should *temporarily store* the registration data and send otp
            });
            const json = await res.json();

            if (!res.ok) {
                setServerMessage(json?.message || "Failed to request OTP");
                return;
            }
            setEmailForOtp(data.email);
            // setCountdown(60); // 60s before resend
            setStep("OTP");
            // resetSignup();

        } catch (err) {
            console.error(err);
            setServerMessage("Network error while requesting OTP");
        }
    };
    const onCreateCustomer = async (payload: customerFormValues) => {
        setServerMessage(null);
        try {
            const res = await fetch("http://localhost:3000/api/customers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const json = await res.json();

            if (!res.ok) {
                setServerMessage(json?.message || "Couldn't create User");
                return;
            }

            if (res.status === 201) {
            resetSignup();
            navigate('/login')
            }

        } catch (err) {
            console.error(err);
            setServerMessage("Network error while creating user");
        }
    };
    const onVerifyOtp = async (payload: OtpFormValues) => {
        setServerMessage(null);
        console.log(payload)
        try {
            const res = await fetch("http://localhost:3000/api/customers/verifyotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), // { email, otp } backend finalizes and returns token
            });

            const json = await res.json();

            if (!res.ok) {
                setServerMessage(json?.message || "OTP verification failed");
                return;
            }

            if (res.status === 200) {
                onCreateCustomer({ email: getValues().email, password: getValues().password })
            }


            // reset otp form & state
            // resetOtpForm();
            // setEmailForOtp(null);
            // setStep("FORM");
            // setServerMessage(null);

            // Navigate to dashboard (protected area)
            // navigate("/products");

        } catch (err) {
            console.error(err);
            setServerMessage("Network error while verifying OTP");
        }
    };



    // Resend OTP
    // const resendOtp = async () => {
    //     if (!emailForOtp) return;
    //     setServerMessage(null);

    //     try {
    //         const res = await fetch("/api/", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email: emailForOtp }),
    //         });

    //         const json = await res.json();
    //         if (!res.ok) {
    //             setServerMessage(json?.message || "Failed to resend OTP");
    //             return;
    //         }

    //         setCountdown(60);
    //         setServerMessage("OTP resent successfully");
    //     } catch (err) {
    //         console.error(err);
    //         setServerMessage("Network error while resending OTP");
    //     }
    // };
    console.log(otpErrors)
    return (
        <div>

            {step === "FORM" && (
                <>
                    <h2>Create account</h2>
                    {serverMessage && <div>{serverMessage}</div>}
                    <form onSubmit={handleSubmit(onSignup)} >
                        <TextInput
                            label={"username"} inputProps={register("username")} />
                        {signupErrors.username && <p>{signupErrors.username.message}</p>}
                        <TextInput
                            label={"email"} inputProps={register("email")} />
                        {signupErrors.email && <p>{signupErrors.email.message}</p>}
                        <TextInput
                            label={"password"} inputProps={register("password")} />
                        {signupErrors.password && <p>{signupErrors.password.message}</p>}

                        <button
                            type="submit"
                            disabled={isSignupSubmitting}
                            className="w-full bg-purple-600 text-white py-2 rounded"
                        >
                            {isSignupSubmitting ? "Requesting OTP..." : "Create account & send OTP"}
                        </button>
                    </form>
                </>
            )}

            {step === "OTP" && (
                <>

                    <h2>Enter OTP</h2>
                    <p>We sent an OTP to <strong>{emailForOtp}</strong></p>
                    {serverMessage && <div>{serverMessage}</div>}
                    <form onSubmit={handleSubmitOtp(onVerifyOtp)}>

                        <div>
                            <label className="block text-sm">OTP</label>
                            <input {...registerOtp("otp")} />
                            {otpErrors.otp && <p>{otpErrors.otp.message}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <button type="submit">
                                {isOtpSubmitting ? "Verifying..." : "Verify OTP"}
                            </button>

                            {/* <button
                                type="button"
                                onClick={resendOtp}
                                disabled={countdown > 0}
                                className="text-sm text-gray-600 underline disabled:opacity-50"
                            >
                                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                            </button> */}
                        </div>

                    </form>

                    <div>
                        <button
                            onClick={() => {
                                // go back to signup - keep emailForOtp so user can use resend if needed
                                setStep("FORM");
                            }}

                        >
                            Edit details
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default GeneratePinPage;