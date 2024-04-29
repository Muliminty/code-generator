const { templates, templatesService } = require('./src/config')

const { processTemplates } = require('./src/utils/processTemplates');
const { data } = require('./src/model/user');


(async () => {
  processTemplates({
    dataSource: await data(),
    templates,
    templatesService
  })
})()
