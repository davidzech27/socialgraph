import type { Component } from 'solid-js';
import { createSignal, For, Show } from 'solid-js';
import { createQuery, createMutation } from './convex';
import { api } from './convex/_generated/api';

const App: Component = () => {
  const messages = createQuery(api.messages.list);
  const sendMessage = createMutation(api.messages.send);

  const [newMessage, setNewMessage] = createSignal('');
  const [isSending, setIsSending] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const body = newMessage().trim();
    if (!body) return;

    setIsSending(true);
    try {
      await sendMessage({ body });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-2xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">real-time message board</h1>

        {/* Message Form */}
        <form onSubmit={handleSubmit} class="mb-8 bg-white p-4 rounded-lg shadow">
          <textarea
            value={newMessage()}
            onInput={(e) => setNewMessage(e.currentTarget.value)}
            placeholder="hey"
            class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            disabled={isSending()}
          />
          <button
            type="submit"
            disabled={isSending() || !newMessage().trim()}
            class="mt-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 w-full text-lg font-semibold"
          >
          send
          </button>
        </form>

        {/* Messages List */}
        <div class="space-y-4">
          <Show
            when={messages()}
            fallback={<p class="text-gray-500 text-center">Loading messages...</p>}
          >
            <For
              each={messages()}
              fallback={<p class="text-gray-500 text-center">No messages yet. Be the first to post!</p>}
            >
              {(message) => (
                <div class="bg-white p-4 rounded-lg shadow">
                  <p class="text-gray-800">{message.body}</p>
                  <p class="text-xs text-gray-500 mt-2">
                    {new Date(message._creationTime).toLocaleString()}
                  </p>
                </div>
              )}
            </For>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default App;
