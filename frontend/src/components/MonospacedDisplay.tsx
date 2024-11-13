function MonospacedDisplay({ content }: { content: string }) {
  return (
    <span className="block w-min rounded-md bg-neutral-900 px-2 py-1 font-mono font-semibold leading-3 text-neutral-400 group-hover:bg-neutral-800">
      {content}
    </span>
  );
}

export default MonospacedDisplay;
