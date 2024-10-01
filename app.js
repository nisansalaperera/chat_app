import { serve } from "https://deno.land/std@0.222.1/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as chatService from "./services/chatService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};



const addMessage = async (request) => {
  const formData = await request.formData();
  const sender = formData.get("sender");
  const message = formData.get("message");

  await chatService.create(sender, message);
  return redirectTo("/");
};

const listMessage = async (request) => {
  const data = await chatService.findAll();

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === "GET"){
    return await listMessage(request);
  }
  if (request.method === "POST") {
    return await addMessage(request);
  }

};

serve(handleRequest, { port: 7777 });