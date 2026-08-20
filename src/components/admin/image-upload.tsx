"use client";

import { upload as uploadToBlob } from "@vercel/blob/client";
import { useState } from "react";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
const maxSize = 12 * 1024 * 1024;

function safeFilename(filename: string) {
  return (
    filename
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "slika"
  );
}

export function ImageUpload({
  name,
  label,
  defaultValue = "",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [uploaded, setUploaded] = useState(false);

  async function upload(file: File) {
    setError("");

    if (!allowedTypes.has(file.type)) {
      setError("Dozvoljeni su JPG, PNG, WebP i AVIF.");
      return;
    }
    if (file.size > maxSize) {
      setError("Fajl je prevelik. Maksimalna veličina je 12 MB.");
      return;
    }

    setBusy(true);
    try {
      const blob = await uploadToBlob(
        `projects/${Date.now()}-${safeFilename(file.name)}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
          multipart: file.size > 5 * 1024 * 1024,
        },
      );
      setValue(blob.url);
      setUploaded(true);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload nije uspeo.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="form-field">
      <label>{label}</label>
      <input type="hidden" name={name} value={value} />
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setUploaded(false);
        }}
        placeholder="https://..."
      />
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        disabled={busy}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      {busy && <small>Otpremanje…</small>}
      {uploaded && !busy && (
        <small>Slika je otpremljena i spremna za čuvanje.</small>
      )}
      {error && <small className="text-red-700">{error}</small>}
    </div>
  );
}
