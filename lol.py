from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackContext

async def start(update: Update, context: CallbackContext):
    chat_id = update.effective_chat.id

    # Описание картинки
    caption = "Это картинка с кнопками"

    # Создание кнопок
    keyboard = [
        [InlineKeyboardButton("Открыть сайт", url='https://example.com')],
        [InlineKeyboardButton("Другая кнопка", callback_data='another_button')],
        [InlineKeyboardButton("Open miniApp", url='https://t.me/n2trybot_bot?start=miniaapp')],
        [InlineKeyboardButton("Открыть приложение", url='https://t.me/n2trybot_bot')]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправка картинки с описанием и кнопками
    await context.bot.send_photo(chat_id=chat_id, photo='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Vim.png/220px-Vim.png', caption=caption, reply_markup=reply_markup)

# Вставьте ваш токен
application = Application.builder().token("7220018530:AAGgWgbKZYlMiH_CsYXXiVp8gH_W-HfRmCw").build()

# Обработчики команд
application.add_handler(CommandHandler("start", start))

application.run_polling()

