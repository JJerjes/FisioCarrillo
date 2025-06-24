from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

EMAIL_EMISOR = 'jerjesmariluz4@gmail.com'
EMAIL_PASSWORD = 'qdltvhiopsahrrwi'

@app.route('/enviar-cita', methods=['POST'])
def enviar_cita():
    data = request.json
    nombre = data.get('name')
    correo_usuario = data.get('email')
    sede = data.get('sede')
    fecha = data.get('fecha')
    hora = data.get('hora')
    mensaje = data.get('mensaje')
    licenciado = data.get('licenciado')
    correo_licenciado = data.get('correo_licenciado')

    asunto = 'Confirmacion de cita - FisioCarrillo'
    cuerpo = f"""

Hola {nombre},

Tu cita ah sido registrada con éxito:

📍 Sede: {sede}
📅 Fecha: {fecha}
⏰ Hora: {hora}
👨‍⚕️ Licenciado: {licenciado}
📝 Motivo: {mensaje}

Gracias por confiar en FisioCarrillo.

"""
    
    try:
        enviar_correo(correo_usuario, asunto, cuerpo) 
        enviar_correo(correo_licenciado, f"Nueva cita agendada - {nombre}", cuerpo)
        return jsonify({'message': '¡Cita registrada y correos enviados!'}), 200
    except Exception as e:
        print('Error al enviar correo:', e)
        return jsonify({'message:' 'Hubo un error al enviar el correo'}), 500

def enviar_correo(destinatario, asunto, cuerpo):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_EMISOR
    msg['To'] = destinatario
    msg['Subject'] = asunto

    msg.attach(MIMEText(cuerpo, 'plain'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as servidor:
        servidor.login(EMAIL_EMISOR, EMAIL_PASSWORD)
        servidor.send_message(msg)

if __name__ == '__main__':
    app.run(port=5000)