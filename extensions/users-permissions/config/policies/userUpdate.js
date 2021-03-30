module.exports = async (ctx, next) => {
  // If the user is an administrator we allow them to perform this action unrestricted
  if (ctx.state.user.role.name === "Administrator") {
    return next()
  }

  // console.log( 'NOT Admin', ctx.state.user.role )

  const { id: currentUserId } = ctx.state.user
  // If you are using MongoDB do not parse the id to an int!
  const userToUpdate = Number.parseInt(ctx.params.id, 10)

  if (currentUserId !== userToUpdate) {
    return ctx.unauthorized("Unable to edit this user ID")
  }

  console.log("BODY", ctx.request.body)
  // Extract the fields regular users should be able to edit
  const { Handle, joinTrainerLeaderboards } = ctx.request.body

  // Provide custom validation policy here
  if (Handle && Handle.trim() === "") {
    return ctx.badRequest("Display name is required")
  }

  // Setup the update object
  const updateData = {
    Handle,
    joinTrainerLeaderboards: !!joinTrainerLeaderboards,
  }

  console.log(updateData)

  // remove properties from the update object that are undefined (not submitted by the user in the PUT request)
  Object.keys(updateData).forEach(
    key => updateData[key] === undefined && delete updateData[key]
  )
  if (Object.keys(updateData).length === 0) {
    return ctx.badRequest("No data submitted")
  }

  ctx.request.body = updateData
  return next()
}
