# stealth
react-front: Holds two react components
            1) For sending file to node api and uploading it to DB
            2) Receives the count of request received fromn RabbitMQ

NodeApp1: Receives data, upload it to db, send message to rabbit queue

NodeApp2: Receives message, count requests numbers in db, send to react when asked.

            
