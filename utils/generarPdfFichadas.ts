import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { IRegistro } from '@shared/models/user';
import * as Print from 'expo-print';
import { Alert } from 'react-native';

function generarHtmlFichadas(fichadas: IRegistro[]) {
  const filas = fichadas
    .map((f) => {
      const fecha = new Date(f.fecha).toLocaleString();

      return `
        <tr>
          <td>${fecha}</td>
          <td>${f.tipo}</td>
          <td>${f.modalidad}</td>
          <td>${f.latitud}</td>
          <td>${f.longitud}</td>
          </tr>
      `;
    })
    .join('');

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 16px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #ccc; padding: 8px; font-size: 12px; }
          th { background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <h1>Listado de Fichadas por Usuario</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Modalidad</th>
              <th>Latitud</th>
              <th>Longitud</th>
            </tr>
          </thead>
          <tbody>
            ${filas}
          </tbody>
        </table>
      </body>
    </html>
  `;

  return html;
}

export default async function generarPdfFichadas(fichadas: IRegistro[]) {
  const html = generarHtmlFichadas(fichadas);
  const { uri: uriLocal } = await Print.printToFileAsync({ html });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const nombreArchivo = `fichadasPorUsuario_${timestamp}.pdf`;

  const archivoTemporal = new File(uriLocal);
  const destino = new File(Paths.document, nombreArchivo);

  await archivoTemporal.move(destino);

  Alert.alert(
    'PDF generado',
    `El archivo se guardó en:\n\n${destino.uri}\n\n¿Querés abrirlo?`,
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Abrir', onPress: () => abrirPdf(destino.uri) },
    ],
  );

  return destino.uri;
}

async function abrirPdf(uri: string) {
  try {
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      Alert.alert('Error', 'Tu dispositivo no permite abrir archivos PDF');
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      UTI: 'com.adobe.pdf',
    });
  } catch (err) {
    console.error('Error abriendo PDF:', err);
    Alert.alert('Error', 'No se pudo abrir el archivo PDF.');
  }
}
