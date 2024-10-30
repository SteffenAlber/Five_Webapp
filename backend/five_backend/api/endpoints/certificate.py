from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from dbOperations import engagements as engagementDB
from models.engagements.certificate.certificateEngagementModel import CertificateEngagementModel
from dbOperations import users as userDB
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from datetime import datetime

router = APIRouter()

@router.get("/{user_id}",
            response_class=StreamingResponse,
            summary="Creates the certificate for the user",
            response_description="pdf with user certificate",
            responses={200: {"description": "A PDF file", "content": {"application/pdf": {}}}}
            )
async def getCertificate(user_id):
    # Erstelle einen BytesIO-Stream, um die PDF-Daten im Speicher zu halten
    pdf_buffer = BytesIO()

    # Erstelle eine PDF-Datei im Speicher
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    c.setFont("Helvetica", 16)
    width, height = letter

    user = await userDB.getUserById(user_id)

    c.drawString(100, height - 3 * cm, f"Zeitspendenachweis für {user.firstName} {user.lastName}")

    previousEngagements = user.previousEngagements
    returnWrite = __writeEngagements(c, await engagementDB.getCertificateEngagements(previousEngagements))

    __writeSummary(c, returnWrite)

    c.save()

    # Setze den Buffer auf den Anfang zurück
    pdf_buffer.seek(0)

    # Rückgabe der PDF-Datei als StreamingResponse
    return StreamingResponse(
        pdf_buffer,
        media_type='application/pdf',
        headers={"Content-Disposition": "attachment; filename=certificate.pdf"}
    )

def __writeEngagements(canvas : canvas.Canvas, engagements : list[CertificateEngagementModel]):
    width, height = letter
    # Initialisierung der Gesamtdauer
    total_seconds_user = 0
    # Startposition festlegen
    yPos =  height - 3 * cm
    # Position für die Spalte am rechten Rand festlegen
    xPosRight = (width * 4) / 5
    canvas.setFont("Helvetica", 14)
    canvas.drawString(xPosRight, yPos, f"Dauer")
    yPos = yPos - 0.5 * cm

    # Schleife um alle Engagements runter zu schreiben
    for engagement in engagements:
        startTime: datetime = engagement.startTime
        endTime: datetime = engagement.endTime

        dateString = f"{startTime.day}.{startTime.month}.{startTime.year}"

        # Datum für Engagement schreiben
        canvas.setFont("Helvetica-Bold", 14)
        canvas.drawString(100, yPos - 20, f"{dateString}")

        duration = endTime - startTime
        total_seconds_current_engagement = duration.total_seconds()
        total_seconds_user = total_seconds_user + total_seconds_current_engagement

        # Dauer für Engagement in Stunden und Minuten schreiben
        hours = int(total_seconds_current_engagement / 3600)
        minutes = int((total_seconds_current_engagement - hours * 3600) / 60)

        canvas.drawString(xPosRight, yPos - 20, f"{hours}:{minutes:02d}h")

        # Engagement Titel
        canvas.setFont("Helvetica-Oblique", 14)
        canvas.drawString(100, yPos - 40, f"{engagement.title}")

        # Organisation
        canvas.setFont("Helvetica", 10)
        canvas.drawString(100, yPos - 55, f"{engagement.organizer.organizationName} ({engagement.organizer.link})")

        # Umblättern falls seite voll ist
        if yPos < 8 * cm:
            canvas.showPage()
            yPos = height - 3 * cm
        else:
            yPos = yPos - 3 * cm

    # aktuelle y-Position auf der Seite sowie die Gesamtdauer des Nutzers in Sekunden zurückgeben
    dictReturn = {
        "yPos": yPos,
        "total_seconds": total_seconds_user
    }

    return dictReturn

def __writeSummary(canvas : canvas.Canvas, dictInfo):
    # Informationen aus dem Parameter holen
    current_y_pos = dictInfo["yPos"]
    total_seconds = dictInfo["total_seconds"]
    width, height = letter
    xPosRight = (width * 4) / 5

    # umblättern falls nicht genug Platz auf der aktuellen Seite ist
    if current_y_pos < 3 * cm:
        canvas.showPage()
        current_y_pos = height - 3 * cm

    # Schriftart setzen und Überschrift schreiben
    canvas.setFont("Helvetica-Bold", 14)
    canvas.drawString(100, current_y_pos, "Insgesamt geleistete Stunden:")

    # Umrechnen der Sekunden in Stunden und Minuten
    hours = int(total_seconds / 3600)
    minutes = int((total_seconds - hours * 3600) / 60)

    canvas.drawString(xPosRight, current_y_pos, f"{hours}:{minutes:02d}h")



