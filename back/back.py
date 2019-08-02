import asyncio
import websockets

async def hello(websocket, path):
    mensagem = await websocket.recv()
    print(f"< {mensagem}")
    await websocket.send(mensagem)

start_server = websockets.serve(hello, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
