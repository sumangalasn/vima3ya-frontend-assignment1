import { useField } from "formik";

export default function FormField({
  name,
  placeholder,
  type = "text",
  validator,
  errorMessage,
  showError,
}) {
  const validate = (value) => {
    if (!value) return errorMessage || "This field is required";

    if (validator === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? undefined
        : "Invalid email";
    }

    if (validator === "phone") {
      return /^[6-9]\d{9}$/.test(value)
        ? undefined
        : "Invalid phone number";
    }

    return undefined;
  };

  const [field, meta] = useField({ name, validate });

  return (
    <div className="mb-5">
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      {showError && meta.error && (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
}