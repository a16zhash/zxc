from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

# Функция, которая обрабатывает команду /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Hello, World!")

# Функция для обработки обычных текстовых сообщений
async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Hello, World!")

def main():
    # Создаем приложение с токеном вашего бота
    application = Application.builder().token('7191428074:AAEQuW7Xee5VfLj5oRpE448hB_vwvkAgiaw').build()

    # Добавляем обработчики команд
    application.add_handler(CommandHandler("start", start))
    # Добавляем обработчик для всех текстовых сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    # Запускаем бота
    application.run_polling()

if __name__ == '__main__':
    main()

