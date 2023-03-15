import { useI18n } from 'vue-i18n'
export const useOptions = () => {
    const { getLocaleMessage, locale } = useI18n()
    const getOptions = (question: string) => Object.keys((getLocaleMessage(locale.value)['questions'] as { [key: string]: any })[question]['options'])
    const getOption = (question: string, option: string) =>   `questions.${question}.options.${option}`
    const optionPercent = (question: any, option: string): number => question && question[option] && Number(question[option]) || 0
    const getQuestionKey = (questionId: string) => `questions.${questionId}.text`

    return { getOption, getOptions, optionPercent, getQuestionKey }
}