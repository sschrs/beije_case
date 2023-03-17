<div align="center">
    <h3>Beije Internship Case</h3>
    <h4>Subscription Tracker</h4>
</div>
<hr>

### Description
The project basically consists of user, subscription, order, address and product entities.
Within each Subscription entity, there are two fields that provide subscription tracking:
nextOder: Indicates when the next order will be placed.
periodAsDay: Indicates the subscription period.

TaskService watches records whose nextOrder date is the same as the current date, with daily periods. After creating new orders for these records, it updates the nextOrder values in accordance with the periodAsDay value.

### Used Technologies
* Node.js
* Nest.js
* TypeScript
* MySQL
* Postman (Production/Test)

### Project Structure
```
src/
┣ address/
┃ ┣ address.controller.ts
┃ ┣ address.entity.ts
┃ ┣ address.module.ts
┃ ┗ address.service.ts
┣ order/
┃ ┣ order-detail.entity.ts
┃ ┣ order.controller.ts
┃ ┣ order.entity.ts
┃ ┣ order.module.ts
┃ ┗ order.service.ts
┣ payment/
┃ ┣ payment.module.ts
┃ ┗ payment.service.ts
┣ product/
┃ ┣ product.controller.ts
┃ ┣ product.entitiy.ts
┃ ┣ product.module.ts
┃ ┗ product.service.ts
┣ response/
┃ ┣ api.response.ts
┃ ┗ error.response.ts
┣ shared/
┃ ┗ encryption.helper.ts
┣ subscription/
┃ ┣ dto/
┃ ┃ ┣ subscription-detail.dto.ts
┃ ┃ ┗ subscription.dto.ts
┃ ┣ subscription-detail.entity.ts
┃ ┣ subscription.controller.ts
┃ ┣ subscription.entity.ts
┃ ┣ subscription.module.ts
┃ ┗ subscription.service.ts
┣ task/
┃ ┣ task.module.ts
┃ ┗ task.service.ts
┣ user/
┃ ┣ dto/
┃ ┃ ┗ user.dto.ts
┃ ┣ user.controller.ts
┃ ┣ user.entity.ts
┃ ┣ user.module.ts
┃ ┗ user.service.ts
┣ app.module.ts
┗ main.ts
```

### Database - ER Diagram
<img src="https://github.com/sschrs/beije_case/blob/main/resources/er_diagram.png?raw=true">
