// src/components/ObfuscatedEmail.tsx
import React, { useState, useEffect } from 'react';

const ObfuscatedEmail = ({ user, domain }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  if (!email) {
    return <span>[E-Mail wird geladen...]</span>;
  }
  return <a href={`mailto:${email}`} className="text-lime-400 hover:underline">{email}</a>;
};

export default ObfuscatedEmail;
