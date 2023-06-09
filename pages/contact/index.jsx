import PageMetaHead from "@/components/MetaHead/PageMetaHead";
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.current.show({
        severity: "error",
        summary: "Fills",
        detail: "Please fill all the field",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Perform validation and submit form data to server
    toast.current.show({ severity: "info", summary: "Send", detail: "Send your Question" });

    // Reset form data state to empty values
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <div className=" h-full  w-full bg-sky-200 px-5     pb-32 pt-4 dark:bg-indigo-950 md:px-24">
        <PageMetaHead title="Contact" />

        <div className="grid h-full w-full grid-cols-1  items-center gap-2 md:grid-cols-2 md:gap-8 md:px-20">
          <div>
            <h1 className=" mb-1 text-2xl font-bold dark:text-slate-200 md:mb-4 md:text-4xl">
              Get in Touch{" "}
            </h1>
            <p className="mb-4 font-mono text-lg leading-relaxed dark:text-slate-400 md:mb-8">
              Have a question, comment or just want to say hello? Fill out the form below and we'll
              get back to you as soon as possible.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <span className="p-float-label p-input-icon-left">
              <i className="pi pi-user-edit" />
              <InputText
                id="name"
                type="text"
                className="w-full"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label htmlFor="name">Name</label>
            </span>
            <span className="p-float-label p-input-icon-left">
              <i className="pi pi-envelope" />
              <InputText
                id="email"
                type="email"
                className="w-full"
                autoComplete="off"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <label htmlFor="email">Email</label>
            </span>
            <span className="p-float-label p-input-icon-left">
              <i className="pi pi-phone" />
              <InputText
                id="phone"
                type="tel"
                className="w-full"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <label htmlFor="phone">Phone Number</label>
            </span>
            <span className="p-float-label ">
              <InputTextarea
                id="message"
                rows={3}
                className="w-full"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <label htmlFor="message">Message</label>
            </span>
            <Toast ref={toast} />
            <Button
              icon="pi pi-send"
              loading={loading}
              iconPos=""
              label="Send"
              className="w-full px-36 md:px-[270px]"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
