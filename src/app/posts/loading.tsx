export default function Loading(): JSX.Element {
    return (
      <div className="flex items-center justify-center p-6">
        <svg className="animate-spin h-5 w-5 mr-3 text-gray-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }