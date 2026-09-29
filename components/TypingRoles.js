"use client";
import { useEffect, useState } from "react";

const ROLES = ["Artificial Intelligence", "Competitive Programming", "Full-Stack Development", "Tech Community Building"];

export default function TypingRoles() {
  const [ri, setRi] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = ROLES[ri];
    if (!del && txt === word) {
      const t = setTimeout(() => setDel(true), 1500);
      return () => clearTimeout(t);
    }
    if (del && txt === "") {
      setDel(false);
      setRi((ri + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(() => {
      setTxt(del ? word.slice(0, txt.length - 1) : word.slice(0, txt.length + 1));
    }, del ? 30 : 65);
    return () => clearTimeout(t);
  }, [txt, del, ri]);

  return (
    <span className="typing">{txt}<span className="caret" /></span>
  );
}
