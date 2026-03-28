import { Formik, Form } from "formik";
import { useEffect, useRef, useState } from "react";

import FormField from "../components/FormField";
import Sidebar from "../components/Sidebar";
import Section from "../components/Section";
import Loader from "../components/Loader";

export default function Home() {
  const [showError, setShowError] = useState(false);
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(false);

  const refs = [useRef(), useRef(), useRef(), useRef()];

  // 🔁 Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const temp = [];

      refs.forEach((ref, i) => {
        const top = ref.current?.getBoundingClientRect().top;

        if (top < window.innerHeight * 0.6) {
          temp.push(i);
        }
      });

      setActive(temp);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎯 Form complete trigger
  const onFormComplete = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          country: "",
          company: "",
          role: "",
        }}
        onSubmit={() => setShowError(true)}
      >
        {({ values }) => {
          const isValid = Object.values(values).every((v) => v);

          useEffect(() => {
            if (isValid) {
              onFormComplete();
            }
          }, [values]);

          return (
            <>
              {loading && <Loader />}

              <Sidebar active={active} />

              <Form className="ml-20 py-10">
                <Section title="Section A — Personal Info" innerRef={refs[0]}>
                  <FormField name="name" placeholder="Full Name" showError={showError} />
                  <FormField name="email" placeholder="Email Address" validator="email" showError={showError} />
                </Section>

                <Section title="Section B — Contact Info" innerRef={refs[1]}>
                  <FormField name="phone" placeholder="Phone Number" validator="phone" showError={showError} />
                  <FormField name="city" placeholder="City" showError={showError} />
                </Section>

                <Section title="Section C — Location" innerRef={refs[2]}>
                  <FormField name="state" placeholder="State" showError={showError} />
                  <FormField name="country" placeholder="Country" showError={showError} />
                </Section>

                <Section title="Section D — Work Info" innerRef={refs[3]}>
                  <FormField name="company" placeholder="Company Name" showError={showError} />
                  <FormField name="role" placeholder="Job Role" showError={showError} />
                </Section>

                <div className="max-w-3xl mx-auto p-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
}