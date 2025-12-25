'use client';

import { useState} from 'react';
import { suapabse } from "../lib/supbaseClient";

export default function ContatctForm() {
    const [form, setForm] = useState({ name: '', email: '', message: ''});

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error }= await SupabaseClient.from('contacts').insert([form]);

        if (error) {
            setStatus ('Error sending message. please try again.');

        }  else {
            setStatus('Message sent sucessfully!');

        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input type="text" name="name" placeholder='Name' value={form.value} onChange={handleChange} required className='w-full border p-2 rounded' />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border p -2 rounded"/>
            <textarea name="message" placeholder='Message' value={form.message} onChange={handleChange} required className="w-full border p-2 rounded" />
            <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded'>Send</button>
            {status && <p>{status}</p>}
        </form>
    );
}