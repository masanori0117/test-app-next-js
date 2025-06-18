import InquiryForm from './_components/InquiryForm';

export const metadata = {
  title: 'お問い合わせ',
  description: 'お問い合わせページ',
};

export default function InquiryPage(): JSX.Element {
  return (
    <div className="min-h-screen">
      <InquiryForm />
    </div>
  );
}