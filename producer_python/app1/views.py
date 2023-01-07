from django.shortcuts import render
import json 
import kafka
from kafka import KafkaProducer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.


ORDER_KAFKA_TOPIC = "messages"
producer = KafkaProducer(bootstrap_servers="localhost:29092")

@csrf_exempt
def send_data(request):
    if request.method == 'POST':
        #body = request.body
        body = json.loads(request.body)
        message = body['message']
        content = body['content']
        pro_data = {
            "message": message,
            "content": content
        }
        print(pro_data)
        producer.send(ORDER_KAFKA_TOPIC, json.dumps(pro_data).encode("utf-8"))
    data = {
        "message": "Your Data has been sent successfully"
    }
    return JsonResponse(data, safe=False)