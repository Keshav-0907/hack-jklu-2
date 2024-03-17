"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase-config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase-config";

const SignUp = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  console.log({ user });

  const handleSubmit = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      const userCredential = await signInWithEmailAndPassword(email, password);
      console.log(`Logged In User : ${user?.email}`);
      const docRef = await addDoc(collection(db, "users"), {
        uid: user?.uid,
        name: name,
        email: email,
      });
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="bg-gray-800 w-1/3 p-10 h-fit flex flex-col gap-10 text-center rounded-xl">
        <span className="text-xl font-bold text-white"> Register Here </span>

        <div className="flex flex-col gap-5">
          <input
            className="p-2 rounded-md"
            type="text"
            s
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
          />
          <input
            className="p-2 rounded-md"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <input
            className="p-2 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-white">
            Already Registered ? <Link href={"/"}> Click Here </Link>
          </div>
          <button
            className="bg-blue-500 p-2 rounded-xl text-white"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
