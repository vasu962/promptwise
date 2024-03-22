'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/dist/client/router';
import Form from '/components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const [searchParamsLoaded, setSearchParamsLoaded] = useState(false);
  const [promptId, setPromptId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    setSearchParamsLoaded(true);
  }, []);

  useEffect(() => {
    if (searchParamsLoaded) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      setPromptId(id);
    }
  }, [searchParamsLoaded]);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found!');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
