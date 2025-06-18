'use client';
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  content: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  content?: string;
}

export default function InquiryForm() {
  const initialFormData: FormData = {
    name: '',
    email: '',
    content: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const content = formData.content.trim();

    if (!name) {
      newErrors.name = '名前は必須です';
    } else if (name.length > 30) {
      newErrors.name = '名前は30文字以内で入力してください';
    }

    if (!email) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'メールアドレスは正しい形式で入力してください';
    }

    if (!content) {
      newErrors.content = '本文は必須です';
    } else if (content.length > 500) {
      newErrors.content = '本文は500文字以内で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(false);
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          content: formData.content.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('送信しました');
        setIsSubmitted(true);
        setFormData(initialFormData);
        setErrors({});
      } else if (response.status === 400) {
        alert('不正なリクエストです。');
      } else if (response.status >= 500) {
        alert('サーバーエラー。');
      } else {
        alert('予期しないエラーが発生しました。');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto py-10">
      <h1 className="text-xl font-bold text-left mb-10">問合わせフォーム</h1>
      {isSubmitted && (
        <p className="text-green-600 mb-4 text-center">送信が完了しました！</p>
      )}
      {isSubmitting && (
        <p className="text-gray-600 mb-4 text-center">送信中...</p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-start gap-16">
                <label className="w-40 text-left font-bold" htmlFor="name">お名前</label>
                <input
                    className="border border-gray-300 rounded-lg p-4 w-full"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                />
            </div>
            <div className="flex items-start gap-16">
                <div className="w-40"></div>
                {errors.name && <p className="text-red-700 text-sm">{errors.name}</p>}
            </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-start gap-16">
                <label className="w-40 text-left font-bold" htmlFor="email">メールアドレス</label>
                <input
                    className="border border-gray-300 rounded-lg p-4 w-full"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                />
            </div>
            <div className="flex items-start gap-16">
                <div className="w-40"></div>
                {errors.email && <p className="text-red-700 text-sm">{errors.email}</p>}
            </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-start gap-16">
                <label className="w-40 text-left font-bold" htmlFor="content">本文</label>
                <div className="w-full">
                    <textarea
                        className="border border-gray-300 rounded-lg p-4 w-full"
                        rows={8}
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
            </div>
            <div className="flex items-start gap-16">
                <div className="w-40"></div>
                {errors.content && <p className="text-red-700 text-sm">{errors.content}</p>}
            </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button
            className="font-bold text-white bg-black rounded-lg px-4 py-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '送信中...' : '送信'}
          </button>
          <button
            className="bg-gray-200 font-bold px-4 py-2 rounded-lg"
            type="button"
            disabled={isSubmitting}
            onClick={handleReset}
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
} 