"use client";

import EditorJS from "@editorjs/editorjs";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";

import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import { PostCreationRequest } from "@/lib/validators/post";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import "@/app/editor.css";
import { Button } from "./Button";

interface EditorProps {}

export const Editor: React.FC<EditorProps> = ({}) => {
  const [title, setTitle] = useState<string>("");
  const pathname = usePathname();
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { mutate: createPost, isLoading: posting } = useMutation({
    mutationFn: async () => {
      const blocks = await ref.current?.save();
      const payload: PostCreationRequest = {
        title,
        content: blocks,
      };
      // const { data } = await axios.post("/api/room/post/create", payload);
      // return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`${pathname}/${data}`);
      return toast({
        description: "Your post has been published.",
      });
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;

    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,

          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles([file], "imageUploader");

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-input mt-10 p-5 rounded-lg border">
        <form className="w-fit">
          <div className="prose prose-stone dark:prose-invert">
            <TextareaAutosize
              onChange={(e) => setTitle(e.target.value)}
              ref={(e) => {
                // @ts-ignore
                _titleRef.current = e;
              }}
              // {...rest}
              placeholder="Title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />
            <div id="editor" className="min-h-[200px]" />
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </form>
      </div>
      <Button
        isLoading={posting}
        className="float-right mt-2"
        size="lg"
        onClick={() => createPost()}
        disabled={posting}
      >
        Post
      </Button>
    </>
  );
};